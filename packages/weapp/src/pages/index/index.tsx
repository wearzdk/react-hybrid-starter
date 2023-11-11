import { Button, Checkbox, Text, Textarea, View } from '@tarojs/components'
import './index.css'

// import '~wechat/components/checkbox.css'
import { useEffect, useRef, useState } from 'react'
import { showModal, showToast } from '@tarojs/taro'
import type { ITodo } from '@hybrid/server'
import { Api } from '@/api/trpc'

export default function Index() {
  const [todoList, setTodoList] = useState<ITodo[]>([])
  // const [loading, setLoading] = useState(false)

  const fetchTodoList = async () => {
    const res = await Api.todoList.query()
    console.log(res)
    setTodoList(res)
  }

  useEffect(() => {
    fetchTodoList()
  }, [])

  // add new
  const [modalVisible, setModalVisible] = useState(false)
  const [currentTodo, setCurrentTodo] = useState<ITodo>({
    _id: '',
    text: '',
    done: false,
  })
  function handelAddNew() {
    setModalVisible(true)
    setCurrentTodo({
      _id: '',
      text: '',
      done: false,
    })
  }
  async function handelSave() {
    if (!currentTodo?.text) {
      showToast({ title: 'Please input your task', icon: 'error' })
      return
    }

    if (!currentTodo._id) {
      // 新增
      await Api.todoCreate.mutate({ text: currentTodo.text })
    }
    else {
      // 编辑
      await Api.todoUpdate.mutate({ ...currentTodo })
    }

    setModalVisible(false)
    await fetchTodoList()
  }

  // 编辑
  async function handelEdit(item: ITodo) {
    setModalVisible(true)
    setCurrentTodo({
      ...item,
    })
  }

  // toggle
  async function handelToggle(item: ITodo) {
    await Api.todoUpdate.mutate({ ...item, done: !item.done })
    await fetchTodoList()
  }

  // 删除
  async function handelDelete(item: ITodo) {
    // 询问
    showModal({
      title: 'Delete',
      content: 'Are you sure to delete this task?',
      success: async (res) => {
        if (res.confirm) {
          await Api.todoDelete.mutate({ id: item._id })
          await fetchTodoList()
        }
      },
    })
  }

  return (
    <View className="w-full h-100vh px-3 pt-4 flex flex-col">
      {/* 新增Modal */}
      <Modal visible={modalVisible} className="" onClose={() => { setModalVisible(false) }}>
        <View className="w-600px flex flex-col justify-between items-center px-3 py-4">
          <Text className="text-2xl w-full font-black text-primary">
            Add new task
          </Text>
          <Textarea
            value={currentTodo?.text}
            onInput={(e) => {
              setCurrentTodo({
                ...currentTodo,
                text: e.detail.value,
              })
            }}
            className="w-full h-200px text-base my-2 p-2 border border-border"
            placeholder="Input your task here"
          >
          </Textarea>

          <Button onClick={handelSave} className="w-full h-80px m-0 p-0 shadow flex items-center justify-center bg-[#131315] active:!bg-[#1e1e1f] text-white">
            <Text className="text-base text-white">Save</Text>
          </Button>
        </View>
      </Modal>

      <View className="flex justify-between">
        {/* header */}
        <Text className="text-2xl font-black text-primary">
          Todo List
        </Text>
        <Button onClick={handelAddNew} className="w-80px h-80px m-0 p-0 shadow flex items-center justify-center">
          <Text className="i-mdi-plus text-44px"></Text>
        </Button>

      </View>
      {/* lists */}
      <View className="mt-4 flex-1">
        {todoList.map(item => (
          <TodoItem
            onToggle={handelToggle}
            onDelete={handelDelete}
            onEdit={handelEdit}
            key={item._id}
            item={item}
          />
        ))}
      </View>

      {/* add btn */}
      <View className="mb-3">
        <Button onClick={handelAddNew} className="w-full h-80px m-0 p-0 shadow flex items-center justify-center bg-[#131315] active:!bg-[#1e1e1f] text-white">
          <Text className="text-base text-white">Add new task</Text>
        </Button>
      </View>
    </View>
  )
}

interface ITodoItemProps {
  item: ITodo
  onDelete: (item: ITodo) => void
  onToggle: (item: ITodo) => void
  onEdit: (item: ITodo) => void
}

function TodoItem(props: ITodoItemProps) {
  const { item, onDelete, onEdit, onToggle } = props
  return (
    <View className="flex justify-between items-center px-3 py-4 mb-3 bg-white border-2px shadow rounded-15px">
      {/* 是否完成 */}
      <Checkbox
        onClick={() => onToggle(item)}
        checked={item.done}
        value=""
      >
      </Checkbox>
      {/* 文本 */}
      <Text onClick={() => onEdit(item)} className="text-xl text-text1">{item.text}</Text>
      <Button
        onClick={() => onDelete(item)}
        className="w-80px h-80px m-0 p-0 border-0 flex items-center bg-transparent justify-center"
      >
        <Text className="i-mdi-delete-outline text-danger text-44px"></Text>
      </Button>
    </View>
  )
}

interface modalProps {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

function Modal(props: modalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  function handelClickOverlay() {
    props.onClose()
  }

  return (
    <>
      {
      props.visible && (
        <View className="fixed z-30 top-0 left-0 w-full h-full flex items-center justify-center">
          {/* overlay */}
          <View
            onClick={handelClickOverlay}
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
          >
          </View>
          <View ref={modalRef} className={`${props.className} w-auto h-auto z-10 bg-white rounded-15px shadow`}>
            {props.children}
          </View>
        </View>
      )
      }
    </>
  )
}
