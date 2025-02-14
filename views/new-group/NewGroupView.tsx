import { useCreateNewGroup } from '@/queries/groups/useCreateNewGroup'
import React from 'react'
import { View, ScrollView, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import UIText from '@/components/ui/UIText'
import { PrimaryButton } from '@/components/ui/buttons/TextButtons'
import { colors } from '@/constants/colors'
import { useColorScheme } from 'react-native'
import { router } from 'expo-router'
import UIView from '@/components/ui/UIView'
import { BlurView } from 'expo-blur'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'

interface NewGroupForm {
  groupName: string
}

export default function NewGroupView() {
  const theme = useColorScheme() ?? 'light'
  const { mutate: createGroup, isPending } = useCreateNewGroup()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewGroupForm>({
    defaultValues: {
      groupName: '',
    },
  })

  const onSubmit = (data: NewGroupForm) => {
    createGroup({ groupName: data.groupName })
  }

  return (
    <BlurView intensity={50} tint="systemThickMaterial" style={{ flex: 1, height: '100%', borderRadius: 32, overflow: 'hidden' }}>
      <ScrollView scrollEnabled={false} style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        {/* Header */}
        <View style={{ marginBottom: 30 }}>
          <View style={{ marginBottom: 10 }}>
            <UIText type="largeTitle">Create New Group</UIText>
          </View>
          <View>
            <UIText type="body" color="secondaryLabel">
              Create a group to start swiping with your friends
            </UIText>
          </View>
        </View>
        {/* Form */}
        <View>
          <View style={{ marginBottom: 8, marginLeft: 12 }}>
            <UIText type="calloutEmphasized">Group Name</UIText>
          </View>
          {/* <KeyboardAvoidingView> */}
          <Controller
            control={control}
            name="groupName"
            rules={{ required: 'Group name is required' }}
            render={({ field: { onChange, value } }) => (
              <BottomSheetTextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors[theme].material,
                    color: colors[theme].label,
                  },
                ]}
                placeholder="Ex. Sea Food Diet"
                placeholderTextColor={colors[theme].secondaryLabel}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {/* </KeyboardAvoidingView> */}
          {errors.groupName && (
            <View style={{ marginTop: 4 }}>
              <UIText type="caption" color="danger">
                {errors.groupName.message || 'Group name is required'}
              </UIText>
            </View>
          )}
        </View>
      </ScrollView>
      {/* Bottom Button */}
      <View style={styles.bottomButton}>
        <PrimaryButton
          type="primary"
          textType="bodyEmphasized"
          text={isPending ? 'Creating...' : 'Create Group'}
          onPress={handleSubmit(onSubmit)}
          isLoading={isPending}
        />
      </View>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  bottomButton: {
    paddingBottom: 32,
    paddingHorizontal: 20,
    width: '100%',
  },
})
